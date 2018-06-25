$(document).ready(function () {

    const DataTypes = {
        ROI: 'ROI',
        FEATURE: 'FEATURE',
        TRACK: "TRACK",
        OTHER: "OTHER",
        MATERIAL: 'MATERIAL',
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
            { data: "datasets", title: "Data and Results", render: renderDatasets }
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
                { data: "name", title: "Dataset", render: renderModalDataset },
                { data: "availability", title: "Results Availability", render: renderModalAvailability },
                { data: "material", title: "Material", render: renderModalMaterial }
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
        let tagObjects = [];
        tags.forEach(tag => {
            const found = TAGS.find((TAG) => TAG.code === tag);
            if (found) {
                tagObjects.push(found);
            }
        });
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
        data.forEach((domain) => {
            if (domain) {
                text += (`<div>${domain}</div>`);
            }
        });
        return text;
    }

    function renderTags(data, type, row) {
        let text = "";
        data.forEach((tag) => {
            if (tag) {
                text += (`<div><a href="${tag.url}">${tag.name}</a></div>`);
            }
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
        let containsMaterials = false;
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

            if (!containsMaterials) {
                containsMaterials = dataTypes.find(
                    (datatype) => datatype === DataTypes.MATERIAL
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
        
        if (containsMaterials) {
            colElement.append(createBadge('M'));
        }

        return rowElement[0].outerHTML;
    }

    function createBadge(letter) {
        return `<span class='secondary badge dataset'>${letter}</span> `;
    }

    function renderModalDataset(data, type, row) {
        return `<a href="${row.link}">${row.name}</a>`;
    }

    function renderModalAvailability(data, type, row) {
        let html = "";
        if (row.availability == "upon request") {
            html = "<a href='mailto:itr@openmicroscopy.org'>";
        } else if (row.mailto) {
            html += "<a href='mailto:";
            html += row.mailto;
            html += "'>";
        }
        html += row.availability;
        if (row.availability == "upon request" || row.mailto) {
            html += "</a>";
        }
        return html;
    }
    
    function renderModalMaterial(data, type, row) {
        if ('material' in row) {
            let html = "";
            row.material.forEach(entry => {
                html += `<a href="${entry.link}">${entry.name}</a><br>`;
            })
            return html
        } else {
            return '';
        }
    }
});
