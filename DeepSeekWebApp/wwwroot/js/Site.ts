class Site {
    //#region Urls

    private readonly _controller = "https://localhost:7061" + "/api/";
    private readonly _urlGetWeatherForecast: string = this._controller + `weatherforecast`;

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
        await fetch(this._urlGetWeatherForecast, { method: 'GET' }).then(async (response) => {
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

    //#endregion
}