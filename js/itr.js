$(document).ready(function () {

    TOOLS.forEach(tool => {
        // Map tag strings to objects
        tool.tags = mapTags(tool.tags)
    });

    $('#tools').DataTable({
        data: TOOLS,
        columns: [
            {
                data: "name",
                title: "Name",
                render: function (data, type, row) {
                    let td = $('td', row).eq(1);

                    let html =
                    '<div>' +
                        '<img src="../img/logos/itr/logo_knime.svg" width="50px"></img>' +
                        '<a href="' + row.projectUrl + '">' + data + '</a>' +
                    '</div>'
                    return html;
                }
            },
            {
                data: "biseToolUrl",
                visible: false
            },
            {
                data: "projectUrl",
                title: "Project",
                visible: false
            },
            {
                data: "domains",
                title: "Domains",
                render: function (data, type, row) {
                    let text = "";
                    data.forEach(function (domain) {
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
                    data.forEach(function (tag) {
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
