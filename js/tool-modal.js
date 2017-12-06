var ToolModal = /** @class */ (function () {

    function ToolModal(container) {
        this.root = container;
        this.root.append(ToolModal.modalHtml);
        this.container = this.root.find('#modalContents');

        // Attach click listener to close button
        this.container.find('.close-button').on('click', () => {
            this.dismiss();
        });;
    }

    ToolModal.prototype.title = function (title) {
        if (title) {
            this.container
                .find(".modal-header__title")
                .text(title);
        }
        return this;
    };

    ToolModal.prototype.icon = function (url) {
        if (url) {
            this.container
                .find(".modal-header__icon")
                .attr('src', url);
        }
        return this;
    }

    ToolModal.prototype.projectUrl = function (url) {
        if (url) {
            var itemsContainer = this.container.find('#itemsContainer');
            $(`<p>Project URL: <a href="${url}">${url}</a></p>`)
                .appendTo(itemsContainer);
        }
        return this;
    }

    ToolModal.prototype.biseToolUrl = function (url) {
        if (!url) {
            var itemsContainer = this.container.find('#itemsContainer');
            $(`<p>BISE URL: <a href="${url}">${url}</a></p>`)
                .appendTo(itemsContainer);
        }
        return this;
    }

    ToolModal.prototype.table = function (dataTable) {
        let item = this.container.find('#datasets');
        $(item[0]).DataTable(dataTable);
        return this;
    }

    ToolModal.prototype.message = function (message) {
        var body = this.getBody();
        body.text(message);
        return this;
    };

    ToolModal.prototype.negativeButton = function (labal, callback) {
        var _this = this;
        var footer = this.getFooter();
        var button = footer.find("#" + ConfirmModal.negativeButtonId);
        if (button.length === 0) {
            button = $("<button type=\"button\" class=\"btn btn-default\" id=\"" + ConfirmModal.negativeButtonId + "\"></button>");
            button.appendTo(footer);
        }
        button.text(labal);
        button.on("click", function (e) {
            callback(_this, e);
        });
        return this;
    };

    ToolModal.prototype.positiveButton = function (labal, callback) {
        var _this = this;
        var footer = this.getFooter();
        var button = footer.find("#" + ConfirmModal.postiveButtonId);
        if (button.length === 0) {
            button = $("<button type=\"button\" class=\"btn btn-default\" id=\"" + ConfirmModal.postiveButtonId + "\"></button>");
            button.appendTo(footer);
        }
        button.text(labal);
        button.on("click", function (e) {
            callback(_this, e);
        });
        return this;
    };

    ToolModal.prototype.show = function () {
        // Add the html to document
        // this.container.appendTo(this.root ? this.root : $(document));
        this.root.foundation('open');
        this.root.on('closed.zf.reveal', () => {
            if ($(document).find(this.container)) {
                this.container.remove();
            }
        });
        return this;
    };

    ToolModal.prototype.dismiss = function () {
        this.root.foundation('close');;
    };

    ToolModal.prototype.getHeader = function () {
        if (!this.header) {
            var header = $("<div class=\"modal-header\"></div>");
            header.appendTo($(this.content));
            this.header = header[0];
        }
        return $(this.header);
    };

    ToolModal.prototype.getBody = function () {
        let body = this.container.find(".modal-body");
        if (!body) {
            body = $("<div class=\"modal-body\"></div>");
            body.appendTo(this.container);
        }
        return body;
    };

    ToolModal.prototype.getFooter = function () {
        if (!this.footer) {
            var footer = $("<div class=\"modal-footer\"></div>");
            footer.appendTo($(this.content));
            this.footer = footer[0];
        }
        return $(this.footer);
    };

    ToolModal.modalHtml = `
        <div id="modalContents">
            <div class="modal-header">
                <button class="close-button" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
                <img class="modal-header__icon"><h3 class="modal-header__title"></h3></img>
            </div>
            <div class="modal-body">
                <div id="itemsContainer">
                </div>
                <div id="tableContainer" class="row">
                    <table id="datasets" class="display compact" cellspacing="0" width="100%">
                    </table>
                </div>
            </div>
        </div>`;
    ToolModal.postiveButtonId = "postive";
    ToolModal.negativeButtonId = "negative";
    return ToolModal;
}());
