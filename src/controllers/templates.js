import path from 'node:path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

// Needed to construct __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', '..', 'templates');

export const listTemplates = async (req, res) => {
    const { type } = req.query
    try {
        const files = await fs.readdir(DATA_DIR);
        const jsonFiles = files.filter(f => f.endsWith('.json'))
        const templates = (
            await Promise.all(jsonFiles.map(async (file) => {
                const content = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
                const json = JSON.parse(content);

                if (!type || json.type === type) {
                    return {
                        name: file.replace('.json', ''),
                        title: json.title,
                        description: json.description,
                        icon: json.icon,
                        quizName: json.quizName,
                        type: json.type
                    };
                }
                return null;
            }))
        ).filter(t => t !== null);

        res.json({
            success: true,
            message: "Quiz templates metadata",
            data: templates
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error reading templates", errors: err });

    }
}

export const getTemplate = (req, res) => {
    const fileName = req.params.name;
    const filePath = path.join(DATA_DIR, `${fileName}.json`);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: `Template "${fileName}" not found.`,
                data: null,
                errors: err
            });
        }
    });
}