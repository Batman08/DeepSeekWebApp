/// <reference types="./AiSummary" />

class AiSummary {
    //#region Urls

    private readonly _controller = "https://localhost:7061" + "/api/";
    private readonly _urlSummariseText: string = this._controller + `textsummary/summarise`;

    //#endregion


    //#region Controls

    private readonly divSummaryModal = document.getElementById(`summaryModal`) as HTMLDivElement;
    private readonly summaryModal = new bootstrap.Modal(this.divSummaryModal);
    private readonly divTextSummary = this.divSummaryModal.querySelector(`#divTextSummary`) as HTMLDivElement;

    //#endregion


    //#region Init

    public static Init(): void {
        new AiSummary().Init();
    }

    private Init(): void {
        this.DisplaySummaryButtons();
    }

    //#endregion


    //#region DisplaySummaryButtons

    private DisplaySummaryButtons(): void {
        document.querySelectorAll(`[data-aiSummary]`).forEach((input: HTMLInputElement | HTMLTextAreaElement) => {
            const summaryButton: HTMLButtonElement = this.CreateSummaryButton(input);
            input.insertAdjacentElement(`afterend`, summaryButton);
        });
    }

    private CreateSummaryButton(input: HTMLInputElement | HTMLTextAreaElement): HTMLButtonElement {
        const button = document.createElement(`button`) as HTMLButtonElement;
        button.type = `button`;
        button.classList.add(`btn`, `btn-outline-primary`, `btn-sm`, `mt-2`);
        button.innerHTML = `<i class="fa-solid fa-comment-nodes"></i> Summarise`;
        button.onclick = (ev: MouseEvent) => this.ServerRequest_SummariseText(ev, input.value);

        return button;
    }

    ///#endregion


    //#region SummariseText

    private async ServerRequest_SummariseText(ev: MouseEvent, inputText: string): Promise<void> {
        const token = document.querySelector("input[name=__RequestVerificationToken]") as HTMLInputElement;
        const dataToServer: TextItemDTO = { Text: inputText };

        await fetch(this._urlSummariseText, {
            method: 'POST',
            headers: {
                'XSRF-TOKEN': token ? token.value : "",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToServer)
        }).then(async (response) => {
            if (response.ok) {
                var responseData = await response.json();
                this.ServerResponse_SummariseText(responseData);
            }
            else {
                throw new Error(`Server error: ${response.status}`);
            }
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    private ServerResponse_SummariseText(textSummaryData: SummaryResponseDTO): void {
        console.log(textSummaryData);

        this.divTextSummary.innerHTML = textSummaryData.summary;
        this.summaryModal.show();
    }

    //#endregion
}