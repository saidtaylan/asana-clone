const {
  insert,
  loginUser,
  listUsers,
  updatePassword,
  getUser,
  modify,
  remove,
} = require("../services/Users.js");
const httpStatus = require("http-status");
const uuid = require("uuid");
const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helpers.js");
const eventEmitter = require("../scripts/events/eventEmitter.js");
const path = require("path");

const list = async (req, res) => {
  try {
    let response = await listUsers();
    response = response.map((item) => {
      return {
        full_name: item.full_name,
        email: item.email,
        id: item._id,
        profile_image: item.profile_image || null,
      };
    });
    res.status(httpStatus.OK).send({ data: response });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const create = async (req, res) => {
  try {
    req.body.password = passwordToHash(req.body.password);
    const newUser = await insert(req.body);
    if (newUser) {
      return res.status(httpStatus.CREATED).send({
        message: "Kullanıcı başarıyla oluşturuldu",
        data: {
          full_name: newUser.full_name,
          email: newUser.email,
          id: newUser._id,
        },
      });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await loginUser({ email: req.body.email });
    if (user?.password === passwordToHash(req.body.password)) {
      res.status(httpStatus.OK).send({
        message: "Giriş başarılı",
        data: {
          id: user._id,
          full_name: user.full_name,
          email: user.email,
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user),
        },
      });
      return;
    }
    res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Email adresinizi veya şifrenizi kontrol ediniz." });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const response = await getUser({ email: req.body.email });
    if (!response) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "Böyle bir kullanıcı bulunamadı." });
    }
    const newPassword =
      uuid.v4().split("-")[1] + uuid.v4().split("-")[0] ||
      `usr-${new Date().getTime()}`;
    let updatedUser = await updatePassword(
      { _id: response._id },
      {
        password: passwordToHash(newPassword),
      }
    );

    eventEmitter.emit("send_email", {
      from: process.env.MAIL_FROM,
      to: updatedUser.email,
      subject: "Şifre Sıfırlama",
      html: `Şifreniz sıfırlanmıştır </br>Yeni şifreniz: <b>${newPassword}</b>`,
    });
    updatedUser = updatedUser.toObject();
    delete updatedUser.password;
    return res.status(httpStatus.OK).send({
      message: "Yeni şifreniz email adresinize gönderildi.",
      data: {
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        id: updatedUser._id,
      },
    });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send("İşlem sırasında bir hata oluştu.");
  }
};

const update = async (req, res) => {
  if (req.body.password) {
    var updatedUser = await modify(req.user._id, {
      ...req.body,
      password: passwordToHash(req.body.password),
    });
  } else {
    var updatedUser = await modify(req.user._id, req.body);
  }
  console.log("updatedUser :>> ", updatedUser);
  if (updatedUser) {
    return res.status(httpStatus.OK).send({
      message: "Güncelleme işlemi başarılı",
      data: {
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        id: updatedUser._id,
        profile_image: updatedUser.profile_image || null,
      },
    });
  }
};

/* const deleteUser = async (req, res) => {
  try {
    const deletedUser = await remove(req.user);
    if (deletedUser) {
      return res
        .status(httpStatus.OK)
        .send({ message: "Kullanıcı başarıyla silindi" });
    }
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Silme işlemi sırasında bir hata oluştu" });
  }
}; */

const profileImageUpload = (req, res) => {
  if (!req.files?.profile_image) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "Bir görsel yüklemelisiniz." });
  }
  const fileExtension = path.extname(req.files.profile_image.name);
  const fileName = `${req.user._id}${fileExtension}`;
  const filePath = path.join(__dirname, "../", "uploads/users", `${fileName}`);
  req.files.profile_image.mv(filePath, () => {
    modify(req.user._id, { profile_image: fileName })
      .then((updatedUser) => {
        return res.status(httpStatus.OK).send({
          message: "Resim başarıyla yüklendi",
          data: {
            full_name: updatedUser.full_name,
            email: updatedUser.email,
            password: updatedUser.password,
            profile_image: updatedUser.profile_image || null,
          },
        });
      })
      .catch(() => {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Resim yükleme esnasında bir hata oluştu" });
      });
  });
};

module.exports = {
  create,
  list,
  login,
  resetPassword,
  update,
  profileImageUpload,
  //  deleteUser,
};
