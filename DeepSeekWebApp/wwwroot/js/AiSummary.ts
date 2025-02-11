class AiSummary {
    //#region Urls

    private readonly _controller = "https://localhost:7061" + "/api/";
    private readonly _urlSummariseText: string = this._controller + `textsummary/summarise`;

    //#endregion


    //#region Controls

    private readonly _container = document.getElementById(`divContainer`) as HTMLDivElement;

    //#endregion


    //#region Init


    public static Init(): void {
        new AiSummary().Init();
    }

    private Init(): void {
        this.BindEvents_AppendAiSummaryButton();
    }

    //#endregion


    //#region Helpers

    private Helpers_GetVerficationToken(formEl: HTMLFormElement | null): string {
        if (!formEl) return "";

        const token = formEl.querySelector("input[name=__RequestVerificationToken]") as HTMLInputElement;
        return token ? token.value : "";
    }

    //#endregion


    //#region DisplayAiSummaryButton

    private BindEvents_AppendAiSummaryButton(): void {
        this._container.querySelectorAll(`[aiSummary]`).forEach((input: HTMLInputElement | HTMLTextAreaElement) => {
            this.DisplayAiSummaryButton(input);
        });
    }

    private DisplayAiSummaryButton(input: HTMLInputElement | HTMLTextAreaElement): void {
        const icon = document.createElement(`span`) as HTMLElement;
        icon.innerHTML = `<i class="fa-solid fa-comment-nodes"></i>`;
        icon.onclick = (ev: MouseEvent) => this.ServerRequest_SummariseText(ev, input.value);

        //append icon before input
        input.insertAdjacentElement(`beforebegin`, icon);
    }

    ///#endregion


    //#region SummariseText

    private async ServerRequest_SummariseText(ev: MouseEvent, inputText: string): Promise<void> {
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

    private ServerResponse_SummariseText(textSummaryData: any): void {
        console.log(textSummaryData);
    }

    //#endregion
}