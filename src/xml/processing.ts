import { XmlNodeType } from './node_type.js';
import { XmlVisitorInterface } from './interfaces/visitor.js';
import { XmlProcessingInterface, XmlNodeInterface } from './interfaces/index.js';
import { NodeManager } from './node_manager.js';

export class XmlProcessing implements XmlProcessingInterface {
    private readonly _nodeManager: NodeManager;

    constructor(readonly target: string, public value: string) {
        this._nodeManager = new NodeManager(XmlNodeType.PROCESSING);
    }

    get nodeType(): XmlNodeType.PROCESSING {
        return XmlNodeType.PROCESSING;
    }

    get parentNode(): XmlNodeInterface | undefined {
        return this._nodeManager.parentNode;
    }

    set parentNode(parentNode: XmlNodeInterface | undefined) {
        this._nodeManager.parentNode = parentNode;
    }

    get innerText(): string {
        return this.value;
    }

    copy(): XmlProcessingInterface {
        return new XmlProcessing(this.target, this.value);
    }

    toXmlString(options: { pretty?: boolean; indent?: string; newLine?: string, entityMapping?: any } = {}): string {
        return this._nodeManager.toXmlString(this, options);
    }

    accept(visitor: XmlVisitorInterface): void {
        visitor.visitProcessing(this);
    }
}