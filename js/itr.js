$(document).ready(function () {

    TOOLS.forEach(function (tool) {
        // Map tag strings to objects
        tool.tags = mapTags(tool.tags);
        tool.logo = mapLogos(tool.name);
    });

    $('#tools').DataTable({
        data: TOOLS,
        columns: [
            {
                data: "biseToolUrl",
                visible: false
            },
            {
                data: "logo",
                visible: false
            },
            {
                data: "name",
                title: "Name",
                render: function (data, type, row) {
                    let div ='<div>';
                    if (row.logo) {
                        div += '<img class="itrLogo" src="' + row.logo + '" width="32px"></img>';
                    }
                    div += '<a href="' + row.projectUrl + '">' + data + '</a>';
                    div += '</div>';
                    return div;
                }
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
            tagObjects[i] = TAGS.find(function (tag) {
                return tag.code === tags[i]
            });
        }
        return tagObjects;
    }

    function mapLogos(toolName) {
        for (let i = 0; i < LOGOS.length; ++i) {
            if (LOGOS[i].name.toLowerCase() === toolName.toLowerCase()) {
                console.log("Found" + toolName);
                return logo = LOGOS[i].imgUrl;
            }
        }
        return null;
    }
});
