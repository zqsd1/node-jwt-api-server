import path from 'node:path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { logger } from '../winston.js';
import { HttpError } from '../httpError.js';

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
        logger.error(err)
        res.status(500).json({ success: false, message: "Error reading templates", errors: err });

    }
}

export const getTemplate = (req, res, next) => {
    const fileName = req.params.name;
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    import(filePath, { with: { type: "json" } })
        .then(file => {
            res.json({
                success: true,
                message: `quiz ${fileName}`,
                data: file.default
            })
        }).catch((err) => {
            logger.error(err)
            next(new HttpError(404, `Template "${fileName}" not found.`))
        })

}