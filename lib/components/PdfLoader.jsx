//      

import React, {Component} from "react";


import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";


class PdfLoader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pdfDocument: null
        };
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate({url}) {
        if (this.props.url !== url) {
            this.load();
        }
    }

    load() {
        const {url, onError} = this.props;
        this.setState({pdfDocument: null});

        if (url) {
            pdfjs
                .getDocument({url: url, eventBusDispatchToDOM: true})
                .promise.then(pdfDocument => {
                this.setState({
                    pdfDocument: pdfDocument
                });
            })
                .catch(onError);
        }
    }

    render() {
        const {children, beforeLoad} = this.props;
        const {pdfDocument} = this.state;

        if (pdfDocument) {
            return children(pdfDocument);
        }

        return beforeLoad;
    }
}

export default PdfLoader;
