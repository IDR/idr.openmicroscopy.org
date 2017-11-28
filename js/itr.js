$(document).ready(function () {

    TOOLS.forEach(tool => {
        // Map tag strings to objects
        tool.tags = mapTags(tool.tags)
    });

    $('#tools').DataTable({
        data: TOOLS,
        columns: [
            { data: "biseToolUrl", visible: false },
            {
                data: "name",
                title: "Name",
                render: function (data, type, row) {
                    return '<a href="' + row.biseToolUrl + '">' + data + '</a>';
                }
            },
            { data: "projectUrl", title: "Project" },
            {
                data: "domains",
                title: "Domains",
                render: function (data, type, row) {
                    let text = "";
                    data.forEach(domain => {
                        text += ('<div>' + domain + '</div>');
                    });
                    return text;
                }
            },
            {
                data: "tags",
                title: "Tags",
                render: function (data, type, row) {
                    let text = "";
                    data.forEach(tag => {
                        text += ('<div><a href="' + tag.url + '">' + tag.name + '</a></div>');
                    });
                    return text;
                }
            },
            {
                data: "datasets",
                title: "Datasets"
            }
        ],
    });

    function mapTags(tags) {
        let tagObjects = [tags.length];
        for (let i = 0; i < tags.length; ++i) {
            tagObjects[i] = TAGS.find(tag => tag.code === tags[i]);
        }
        return tagObjects;
    }

});

// var ToolService = /** @class */ (function () {
//     let schemaBuilde;
//     let toolsDbl;

//     function ToolService() {
//         this.schemaBuilder = lf.schema.create('Tools', lf.schema.DataStoreType.MEMORY);
//     }

//     ToolService.prototype.init() = function () {
//         this.schemaBuilder.createTable('Domains')
//             .addColumn('id', lf.Type.INTEGER)
//             .addColumn('name', lf.Type.STRING)
//             .addPrimaryKey(['id']);

//         this.schemaBuilder.createTable('Projects_Domains')    
//             .addColumn('projectId', lf.Type.INTEGER)
//             .addColumn('domainId', lf.Type.INTEGER);

//         this.schemaBuilder.createTable('Projects')
//             .addColumn('id', lf.Type.INTEGER)
//             .addColumn('name', lf.Type.STRING)
//             .addColumn('biseUrl', lf.Type.STRING)
//             .addColumn('projectUrl', lf.Type.STRING)
//             .addColumn('domains', lf.Type.STRING)
//             .addColumn('tags', lf.Type.STRING)
//             .addPrimaryKey(['id']);

//         return this.schemaBuilder.connect()
//             .then(this._setDb.bind(this))
//             .then(this._insertDomains)
//             .then(this._insertTools);   
//     }

//     ToolService.prototype._setDb = function (db) {
//         this.toolsDbl = db;
//     }

//     ToolService.prototype._insertDomains = function () {
//         const domainsTbl = toolsDbl.getSchema().table('Domains');
//         const rows = [];
//         _domains.forEach(element => {
//             rows.add(domainsTbl.createRow(element));
//         });
//         return toolsDbl.insertOrReplace()
//             .into(domainsTbl)
//             .values(domains)
//             .exec();
//     }

//     ToolService.prototype._insertTools = function () {
//         const projectsTbl = toolsDbl.getSchema().table('Tools');
//         const rows = [];
//         _tools.forEach(element => {
//             rows.add(projectsTbl.createRow(element));
//         });
//         return toolsDbl.insertOrReplace()
//             .into(projectsTbl)
//             .values(rows)
//             .exec();
//     }

//     return ToolService;
// }());



