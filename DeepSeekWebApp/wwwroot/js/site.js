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
        await fetch(this._urlSummariseText + "?text=this is a test", { method: 'GET' }).then(async (response) => {
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