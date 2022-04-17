const { fetch, insert, modify, remove, fetchOne } = require("../services/Tasks.js");
const httpStatus = require("http-status");

const list = async (req, res) => {
  try {
    const response = await fetch({ section_id: req.params.section_id });
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const create = async (req, res) => {
  try {
    const response = await insert({
      ...req.body,
      user_id: req.user._id,
      section_id: req.params.section_id,
    });
    return res.status(httpStatus.CREATED).send({ message: "Task oluşturuldu", data: response });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const update = async (req, res) => {
  try {
    let modifiedTask = await modify(req.params.id, req.body);
    return res.status(httpStatus.OK).send({ message: "Güncelleme işlemi başarılı", data: modifiedTask });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Güncelleme sırasında bir hata oluştu" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedUser = await remove(req.params.id);
    if (!deletedUser) {
      return res.status(httpStatus.NOT_IMPLEMENTED).send({ message: "Böyle bir task bulunamadı" });
    }
    return res.status(httpStatus.OK).send({ message: "Silme işlemi başarılı" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const addComment = async (req, res) => {
  try {
    const theTask = await fetchOne({ _id: req.params.id });
    if (theTask) {
      theTask.comments.push({
        ...req.body,
        commented_at: new Date(),
        user_id: req.user._id,
      });
      await theTask.save();
      return res.status(httpStatus.CREATED).send({ messsage: "Yorumunuz eklenmiştir", data: theTask });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const theTask = await fetchOne({ _id: req.params.id });
    if (theTask) {
      theTask.comments = theTask.comments.filter((item) => item._id?.toString() !== req.params.comment_id);
      await theTask.save();
      console.log("theTask :>> ", theTask);
      return res.status(httpStatus.OK).send({ messsage: "Yorumunuz silinmiştir.", data: theTask });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const addSubTask = async (req, res) => {
  try {
    const mainTask = await fetchOne({ _id: req.params.id });
    if (mainTask) {
      const subTask = await insert({ ...req.body, user_id: req.user._id });
      mainTask.sub_tasks.push(subTask._id);
      await mainTask.save();
      return res.status(httpStatus.CREATED).send({ message: "Subtask başarıyla oluşturuldu", data: mainTask });
    } else {
      return res.send(httpStatus.NOT_FOUND).send({ error: "Kendisine eklenmek istenen task mevcut değil." });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
};

module.exports = {
  list,
  create,
  update,
  deleteTask,
  addComment,
  deleteComment,
  addSubTask,
};
