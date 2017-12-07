$(document).ready(function () {

    const DataTypes = {
        ROI: 'ROI',
        FEATURE: 'FEATURE',
        TRACK: "TRACK",
        OTHER: "OTHER",
    };

    TOOLS.forEach(function (tool) {
        // Map tag strings to objects
        tool.tags = mapTags(tool.tags);
        tool.logo = mapLogos(tool.name);
    });

    const toolsTable = $('#tools').DataTable({
        data: TOOLS,
        columns: [
            { data: "biseToolUrl", visible: false },
            { data: "logo", visible: false },
            { data: "projectUrl", title: "Project", visible: false },
            { data: "name", title: "Name", render: renderName },
            { data: "domains", title: "Domains", render: renderDomains },
            { data: "tags", title: "Tags", render: renderTags },
            { data: "datasets", title: "Datasets", render: renderDatasets }
        ],
    });

    $("#tools tbody").on("click", "td", function () {
        if ($(this).index() !== 3) {
            // Handle clicks only on the "Datasets" column
            return;
        }

        // Get data associated with selected row
        const rowData = toolsTable.row(this).data();

        // Formulate dataset table
        var tableOptions = {
            data: rowData.datasets,
            lengthChange: false,
            searching: false,
            columns: [
                { data: "name", title: "Dataset",
                    "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                                $(nTd).html("<a href='"+oData.link+"'>"+oData.name+"</a>");
                    }
                },
                { data: "availability", title: "Results Availability" }
            ]
        };

        new ToolModal($('#projectModal'))
            .title(rowData.name)
            .icon(rowData.logo)
            .projectUrl(rowData.projectUrl)
            .biseToolUrl(rowData.biseToolUrl)
            .table(tableOptions)
            .show();
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
                return logo = LOGOS[i].imgUrl;
            }
        }
        return null;
    }

    function renderName(data, type, row) {
        let div = '<div class="nameCell">';
        if (row.logo) {
            // div += `<img class="itrLogo" src="${row.logo}"></img>`;
        }
        div += `<a href="${row.projectUrl}">${data}</a>`;
        if (row.biseToolUrl) {
            div += `<a href="${row.biseToolUrl}"> <i class="external-link fa fa-external-link"></i></a>`;
        }
        div += '</div>';
        return div;
    }

    function renderDomains(data, type, row) {
        let text = "";
        data.forEach(function (domain) {
            text += ('<div>' + domain + '</div>');
        });
        return text;
    }

    function renderTags(data, type, row) {
        let text = "";
        data.forEach(function (tag) {
            text += ('<div><a href="' + tag.url + '">' + tag.name + '</a></div>');
        });
        return text;
    }

    function renderDatasets(data, type, row) {
        let rowElement = $('<div class="row"></div>');
        let colElement = $('<div class="columns"><div>');
        rowElement.append(colElement);

        let containsFeatures = false;
        let containsRois = false;
        let containsTracks = false;
        let containsOthers = false;
        data.forEach(dataset => {
            const dataTypes = dataset.dataTypes;
            if (!containsFeatures) {
                containsFeatures = dataTypes.find(
                    (datatype) => datatype === DataTypes.FEATURE
                );
            }

            if (!containsRois) {
                containsRois = dataTypes.find(
                    (datatype) => datatype === DataTypes.ROI
                );
            }

            if (!containsTracks) {
                containsTracks = dataTypes.find(
                    (datatype) => datatype === DataTypes.TRACK
                );
            }

            if (!containsOthers) {
                containsOthers = dataTypes.find(
                    (datatype) => datatype === DataTypes.OTHER
                );
            }
        })

        if (containsFeatures) {
            colElement.append(createBadge('F'));
        }

        if (containsRois) {
            colElement.append(createBadge('R'));
        }

        if (containsTracks) {
            colElement.append(createBadge('T'));
        }

        if (containsOthers) {
            colElement.append(createBadge('O'));
        }

        return rowElement[0].outerHTML;
    }

    function createBadge(letter) {
        return `<span class='secondary badge dataset'>${letter}</span> `;
    }

});
