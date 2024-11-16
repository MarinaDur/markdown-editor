import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import Document from "../models/docModel.js";

const sanitizeInput = (input) => {
  return input.replace(/<[^>]*>/g, "");
};

export const postDoc = catchAsync(async (req, res, next) => {
  const document = await Document.create({
    title: sanitizeInput(req.body.title),
    content: sanitizeInput(req.body.content),
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      document,
    },
  });
});

export const getUserDocs = catchAsync(async (req, res, next) => {
  const documents = await Document.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    results: documents.length,
    data: {
      data: documents,
    },
  });
});

export const getUserOneDoc = catchAsync(async (req, res, next) => {
  const document = await Document.findById(req.params.docId);

  if (!document) {
    return next(new AppError("No document found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: document,
    },
  });
});

export const updateUserDoc = catchAsync(async (req, res, next) => {
  const document = await Document.findByIdAndUpdate(
    req.params.docId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!document) {
    return next(new AppError("No document found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: document,
    },
  });
});

export const deleteUserOneDoc = catchAsync(async (req, res, next) => {
  const document = await Document.findByIdAndDelete(req.params.docId);

  if (!document) {
    return next(new AppError("No document found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Document was deleted successfully",
    data: null,
  });
});
