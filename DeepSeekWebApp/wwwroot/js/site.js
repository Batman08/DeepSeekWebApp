class Site {
    constructor() {
        this._controller = "https://localhost:7061" + "/api/";
        this._urlSummariseText = this._controller + `textsummary/summarise`;
        this._container = document.getElementById(`divContainer`);
        this.inputTextArea = this._container.querySelector(`#inputTextArea`);
    }
    static Init() {
        new Site().Init();
    }
    Init() {
        this.BindEvents_AppendAiSummaryButton();
    }
    Helpers_GetVerficationToken(formEl) {
        if (!formEl)
            return "";
        const token = formEl.querySelector("input[name=__RequestVerificationToken]");
        return token ? token.value : "";
    }
    Helpers_Prompt() {
        return `Up, up, and away! Paper airplanes are a fun, easy way to pass the time—but how exactly do you turn a basic piece of paper into a jet-setting masterpiece? You’ve come to the right place. We’ve put together a handy, step-by-step guide to help you fold your way to a sleek, far-flying paper airplane. IJust grab a piece of 8 ½ in (21.5 cm) by 11 in (28 cm) paper (or A4 size Printer or Copy paper) and get folding. In a matter of minutes, you’ll be ready for take-off!`;
    }
    BindEvents_AppendAiSummaryButton() {
        this._container.querySelectorAll(`[aiSummary]`).forEach((input) => {
            this.DisplayAiSummaryButton(input);
        });
    }
    DisplayAiSummaryButton(input) {
        const icon = document.createElement(`span`);
        icon.innerHTML = `<i class="fa-solid fa-comment-nodes"></i>`;
        icon.onclick = (ev) => this.ServerRequest_SummariseText(ev, input.value);
        input.insertAdjacentElement(`beforebegin`, icon);
    }
    async ServerRequest_SummariseText(ev, inputText) {
        await fetch(this._urlSummariseText, {
            method: 'POST',
            headers: {
                'XSRF-TOKEN': this.Helpers_GetVerficationToken(null),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Text: inputText })
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                var responseData = await response.json();
                console.log(responseData);
                this.ServerResponse_SummariseText(responseData);
            }
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
    ServerResponse_SummariseText(textSummaryData) {
        console.log(textSummaryData);
    }
}
//# sourceMappingURL=Site.js.map