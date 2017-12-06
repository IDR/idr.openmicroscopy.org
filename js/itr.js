$(document).ready(function () {

    TOOLS.forEach(function (tool) {
        // Map tag strings to objects
        tool.tags = mapTags(tool.tags);
        tool.logo = mapLogos(tool.name);
    });

    /**
     * Callback for 
     */
    $("#tools").on("click", "tr .detail a", function () {
        const toolId = $(this).data('id');
        const toolModel = TOOLS.find(function (tool) {
            return tool.name === toolId;
        })

        // Formulate dataset table
        var tableOptions = {
            data: toolModel.datasets,
            lengthChange: false,
            searching: false,
            columns: [
                { data: "name", title: "Dataset" },
                { data: "availability", title: "Availability" }
            ]
        };

        new ToolModal($('#projectModal'))
            .title(toolModel.name)
            .projectUrl(toolModel.projectUrl)
            .biseToolUrl(toolModel.biseToolUrl)
            .table(tableOptions)
            .show();
    });

    $('#tools').DataTable({
        data: TOOLS,
        columns: [
            { data: "biseToolUrl", visible: false },
            { data: "logo", visible: false },
            { data: "datasets", title: "Datasets", visible: false },
            { data: "projectUrl", title: "Project", visible: false },
            { data: "name", title: "Name", render: renderName },
            { data: "domains", title: "Domains", render: renderDomains },
            { data: "tags", title: "Tags", render: renderTags }
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
                return logo = LOGOS[i].imgUrl;
            }
        }
        return null;
    }

    function renderName(data, type, row) {
        let div = '<div class="detail">';
        if (row.logo) {
            div += `<img class="itrLogo" src="${row.logo}" width="32px"></img>`;
        }
        div += `<a href="#" data-id="${row.name}">${data}</a>`;
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

    function renderDialog(row) {
        // <div class="reveal" id="exampleModal1" data-reveal>
        // <h1>Awesome. I Have It.</h1>
        // <p class="lead">Your couch. It is mine.</p>
        // <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
        // <button class="close-button" data-close aria-label="Close modal" type="button">
        //   <span aria-hidden="true">&times;</span>
        // </button>
        // </div>
        return null;
    }

    // Listen to modal opened events
    // $('#projectModal').on('open.zf.reveal', function () {
    //     let toolId = $(this).data('id');
    //     let toolModel = TOOLS.find(function (tool) {
    //         return tool.name === toolId;
    //     })

    //     // Formulate dataset table
    //     var tableOptions = {
    //         data: toolModel.datasets,
    //         lengthChange: false,
    //         searching: false,
    //         columns: [
    //             { data: "name", title: "Dataset" },
    //             { data: "availability", title: "Availability" }
    //         ]
    //     };

    //     new ToolModal(this)
    //         .title(toolModel.name)
    //         .projectUrl(toolModel.projectUrl)
    //         .biseToolUrl(toolModel.biseToolUrl)
    //         .table(tableOptions);
    // })


});