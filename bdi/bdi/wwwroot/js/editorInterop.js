import EditorJS from 'https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest/dist/editorjs.mjs';
import Header from 'https://cdn.jsdelivr.net/npm/@editorjs/header@latest/dist/header.mjs';
import List from 'https://cdn.jsdelivr.net/npm/@editorjs/list@latest/dist/editorjs-list.mjs';
import Checklist from 'https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest/dist/checklist.mjs';

window.editorInterop = {
    instance: null,

    init: function (holderId, initialDataJson) {
        if (window.editorInterop.instance) {
            window.editorInterop.instance.destroy();
        }

        let initialData = {};
        if (initialDataJson) {
            try {
                initialData = JSON.parse(initialDataJson);
            } catch (e) {
                console.error('Failed to parse initial data:', e);
            }
        }

        window.editorInterop.instance = new EditorJS({
            holder: holderId,
            placeholder: 'Trykk på "/" for verktøy...',
            data: initialData,
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link', 'bold', 'italic'],
                    config: {
                        placeholder: 'Skriv en overskrift...',
                        levels: [1, 2, 3],
                        defaultLevel: 2
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                }
            }
        });
    },

    save: async function () {
        if (window.editorInterop.instance) {
            try {
                const outputData = await window.editorInterop.instance.save();
                return JSON.stringify(outputData);
            } catch (error) {
                console.error('Save failed:', error);
                return null;
            }
        }
        return null;
    }
};
