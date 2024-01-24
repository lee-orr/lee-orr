import { PDFDocument, PDFFont, PDFPage, PageSizes, StandardFontEmbedder, StandardFontValues, StandardFonts, TextAlignment, layoutMultilineText, layoutSinglelineText } from "pdf-lib";
import { createEffect, createSignal } from "solid-js";

import styles from "./resume-generator.module.css";

interface BaseResumeInfo { title: string, name: string, contacts: Array<{ type: string, value: string, icon: string }> }

export default function ResumeGenerator(base_info: BaseResumeInfo) {
    const [blob, set_blob] = createSignal<string>("");

    createEffect(() => {
        generate_pdf(base_info, set_blob);
    });

    return <div class={styles.generator}>
        <div class={styles.options}>Test</div>
        <div class={styles.result}>
            <iframe src={blob()} />
        </div>
    </div>;
}

async function generate_pdf({ title, name, contacts }: BaseResumeInfo, set_blob: (url: string) => void) {
    const pdfDoc = await PDFDocument.create();

    let resume = new ResumeWrapper(pdfDoc);

    resume.draw_heading(name, "title");
    resume.draw_heading(title, "subtitle");
    resume.draw_heading(contacts.map(({ type, value }) => `${type}: ${value}`).join(", "), "section");

    set_blob(await resume.export());
}

class ResumeWrapper {
    doc: PDFDocument;
    page_size: [number, number] = PageSizes.Letter;
    margins: [number, number] = [15, 15];
    usable_size: [number, number];
    page_boundaries: [number, number, number, number];

    current_page: PDFPage;
    current_y: number;

    regular: PDFFont;

    constructor(doc: PDFDocument) {
        this.doc = doc;
        this.regular = doc.embedStandardFont(StandardFonts.Courier);

        this.usable_size = [this.page_size[0] - this.margins[0] * 2, this.page_size[1] - this.margins[1] * 2];
        this.page_boundaries = [this.margins[0], this.page_size[1] - this.margins[1], this.page_size[0] - this.margins[0], this.margins[1]];

        this.current_page = doc.addPage(this.page_size);
        this.current_y = this.margins[1];
    }

    async export(): Promise<string> {
        return this.doc.saveAsBase64({ dataUri: true });
    }

    get_page_with_available_height(height: number): { page: PDFPage, y: number } {
        if (this.current_y + height > this.usable_size[1]) {
            this.current_page = this.doc.addPage(this.page_size);
            this.current_y = this.margins[1];
        }

        this.current_y += height;

        let y = this.page_boundaries[1] - this.current_y;

        return { page: this.current_page, y };
    }

    draw_heading(text: string, size: 'title' | 'subtitle' | 'section'): ResumeWrapper {
        let fontSize = FONT_SIZE[size] ?? FONT_SIZE.normal;
        let layout = layoutMultilineText(text, { alignment: TextAlignment.Center, fontSize, bounds: { x: 0, y: this.current_y, width: this.usable_size[0], height: this.usable_size[1] - this.current_y }, font: this.regular });
        for (let line of layout.lines) {
            let { page, y } = this.get_page_with_available_height(layout.lineHeight);
            page.drawText(line.text, { x: line.x + this.page_boundaries[0], y: y, lineHeight: layout.lineHeight });
            this.get_page_with_available_height(LINE_PADDING[size] ?? LINE_PADDING.normal);
        }

        return this;
    }
}

const FONT_SIZE: Record<string, number> = {
    title: 20,
    subtitle: 18,
    section: 14,
    normal: 12
};

const LINE_PADDING: Record<string, number> = {
    title: 10,
    subtitle: 10,
    normal: 10
};