const asyncHandler = require('../middlewares/asyncHandler');
const Tool = require('../models/Tool');

const getAllTools = asyncHandler(async (req, res) => {
    const tools = await Tool.find();
    if (!tools) return res.status(404).json({ error: `Please add some tools to db before fetching.` });
    res.json({ message: `Total ${tools.length} tools are fetched from db.`, tools });
});

const getById = asyncHandler(async (req, res) => {
    const { toolId } = req.params;
    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ error: `tool with ${toolId} is not found.` });
    res.json({ message: `${tool.title} is fetched.`, tool });
});

const createTool = asyncHandler(async (req, res) => {
    const { title, description, tags, siteUrl, features } = req.body;
    if (!title || !description || !tags || !siteUrl) {
        return res.status(400).json({ error: `All fields are required.` });
    }
    const newTool = await Tool.create({ title, description, tags, siteUrl, features });
    res.status(201).json({ message: `Tool with ${title} is added to db.`, newTool });
});

const updateTool = asyncHandler(async (req, res) => {
    const { toolId } = req.params;
    const tool = await Tool.findById(toolId);
    if (!toolId || !tool) return res.status(404).json({ error: `Tool with id: ${toolId} not found.` });
    const { title, description, tags, siteUrl, features } = req.body;
    const updated = await Tool.findByIdAndUpdate(toolId, { title, description, tags, siteUrl, features }, { new: true });
    res.json({ message: `Tool with id: ${toolId} is updated.` });
});

const deleteTool = asyncHandler(async (req, res) => {
    const { toolId } = req.params;
    const tool = await Tool.findById(toolId);
    if (!toolId || !tool) return res.status(404).json({ error: `Tool with id: ${toolId} not found.` });
    const deleted = await Tool.findByIdAndDelete(toolId);
    res.json({ message: `Tool with id: ${toolId} deleted.` });
});

module.exports = { getAllTools, getById, createTool, updateTool, deleteTool };
