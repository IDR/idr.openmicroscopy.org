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
