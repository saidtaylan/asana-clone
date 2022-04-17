const { fetch, insert, modify, remove } = require("../services/Sections.js");
const httpStatus = require("http-status");

const list = async (req, res) => {
  try {
    const response = await fetch({ project_id: req.params.project_id });
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const create = async (req, res) => {
  try {
    const response = await insert({ ...req.body, user_id: req.user._id });
    return res
      .status(httpStatus.CREATED)
      .send({ message: "Section oluşturuldu", data: response });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const update = async (req, res) => {
  try {
    let modifiedSection = await modify(req.params.id, req.body);
    return res
      .status(httpStatus.OK)
      .send({ message: "Güncelleme işlemi başarılı", data: modifiedSection });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: "Güncelleme sırasında bir hata oluştu" });
  }
};

const deleteSection = async (req, res) => {
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
  deleteSection,
};
