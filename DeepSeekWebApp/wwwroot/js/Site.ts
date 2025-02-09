class Site {
    //#region Urls

    private readonly _controller = "https://localhost:7061" + "/api/";
    private readonly _urlSummariseText: string = this._controller + `textsummary`;

    //#endregion

    public static Init(): void {
        new Site().Init();
    }

    private Init(): void {
        this.ServerRequest_SummariseText();
    }


    //#region Helpers

    private Helpers_GetVerficationToken(formEl: HTMLFormElement): string {
        const token = formEl.querySelector("input[name=__RequestVerificationToken]") as HTMLInputElement;
        return token ? token.value : "";
    }

    //#endregion


    //#region SummariseText

    private async ServerRequest_SummariseText(): Promise<void> {
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

    private ServerResponse_SummariseText(textSummaryData: any): void {
        console.log(textSummaryData);
    }

    private Prompt(): string {
        return `Up, up, and away! Paper airplanes are a fun, easy way to pass the time—but how exactly do you turn a basic piece of paper into a jet-setting masterpiece? You’ve come to the right place. We’ve put together a handy, step-by-step guide to help you fold your way to a sleek, far-flying paper airplane. IJust grab a piece of 8 ½ in (21.5 cm) by 11 in (28 cm) paper (or A4 size Printer or Copy paper) and get folding. In a matter of minutes, you’ll be ready for take-off!"`;
    }

    //#endregion
}