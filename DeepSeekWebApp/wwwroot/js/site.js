class Site {
    constructor() {
        this._controller = "https://localhost:7061" + "/api/";
        this._urlSummariseText = this._controller + `textsummary`;
    }
    static Init() {
        new Site().Init();
    }
    Init() {
        this.ServerRequest_SummariseText();
    }
    Helpers_GetVerficationToken(formEl) {
        const token = formEl.querySelector("input[name=__RequestVerificationToken]");
        return token ? token.value : "";
    }
    async ServerRequest_SummariseText() {
        await fetch(this._urlSummariseText + `?text=${this.Prompt()}`, { method: 'GET' }).then(async (response) => {
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
    Prompt() {
        return `Up, up, and away! Paper airplanes are a fun, easy way to pass the time—but how exactly do you turn a basic piece of paper into a jet-setting masterpiece? You’ve come to the right place. We’ve put together a handy, step-by-step guide to help you fold your way to a sleek, far-flying paper airplane. IJust grab a piece of 8 ½ in (21.5 cm) by 11 in (28 cm) paper (or A4 size Printer or Copy paper) and get folding. In a matter of minutes, you’ll be ready for take-off!"`;
    }
}
//# sourceMappingURL=Site.js.map