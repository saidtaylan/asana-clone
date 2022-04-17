const { fetch, insert, modify, remove } = require("../services/Projects.js");
const httpStatus = require("http-status");

const list = async (req, res) => {
  try {
    const response = await fetch({ user_id: req.user?._id });
    res.status(httpStatus.OK).send(response);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const create = async (req, res) => {
  try {
    const response = await insert({...req.body, user_id: req.user._id});
    res
      .status(httpStatus.CREATED)
      .send({ message: "Proje oluşturuldu", data: response });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const update = async (req, res) => {
  try {
    if (req.params?.id) {
      let modifiedProject = await modify(req.params.id, req.body);
      return res
        .status(httpStatus.OK)
        .send({
          message: "Proje bilgileri güncellendi",
          data: { name: modifiedProject.name, id: modifiedProject._id },
        });
    }
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "Proje ID bilgisi sağlanmamış" });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: "Güncelleme sırasında bir hata oluştu" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deletedUser = await remove(req.params.id);
    if (!deletedUser) {
      return res
        .status(httpStatus.NOT_IMPLEMENTED)
        .send({ message: "Böyle bir proje bulunamadı" });
    }
    return res.status(httpStatus.OK).send({ message: "Silme işlemi başarılı" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

module.exports = {
  list,
  create,
  update,
  deleteProject,
};
