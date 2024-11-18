import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import Document from "../models/docModel.js";

const sanitizeInput = (input) => {
  return input.replace(/<[^>]*>/g, "");
};

export const createDefaultDocsOnSignup = catchAsync(async (req, res, next) => {
  const documents = [
    {
      createdAt: Date.now(),
      user: req.user._id,
      name: "untitled - document.md",
      content: "",
    },
    {
      createdAt: Date.now(),
      user: req.user._id,
      name: "welcome.md",
      content:
        "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
    },
  ];

  await Document.insertMany(documents);

  sendToken(newUser, 201, res);
});

export const postDoc = catchAsync(async (req, res, next) => {
  const document = await Document.create({
    name: sanitizeInput(req.body.name),
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
