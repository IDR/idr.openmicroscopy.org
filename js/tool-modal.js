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
            const icon = this.container.find(".modal-header__icon");
            this.container
                .find(".modal-header__title")
                .text(" " + title)
                .prepend(icon);
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

    ToolModal.modalHtml = `
        <div id="modalContents">
            <button class="close-button" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="modal-header">
                <h1 class="modal-header__title"><img class="modal-header__icon"></h1>
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

    return ToolModal;
}());
