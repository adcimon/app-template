export class WindowStyleSync {
	private readonly source: Document;
	private readonly target: Document;
	private readonly clones: Map<Node, Node> = new Map();
	private observer?: MutationObserver;

	public constructor(source: Document, target: Document) {
		this.source = source;
		this.target = target;
	}

	public start(): void {
		this.source.head.childNodes.forEach((node: Node) => this.add(node));

		this.observer = new MutationObserver(this.handleMutations);
		this.observer.observe(this.source.head, {
			characterData: true,
			childList: true,
			subtree: true,
		});
	}

	public stop(): void {
		this.observer?.disconnect();
		this.observer = undefined;
		this.clones.forEach((clone: Node) => clone.parentNode?.removeChild(clone));
		this.clones.clear();
	}

	private handleMutations = (mutations: MutationRecord[]): void => {
		mutations.forEach((mutation: MutationRecord) => {
			if (mutation.type === 'characterData') {
				const style: Node | null = mutation.target.parentNode;
				if (style) {
					this.remove(style);
					this.add(style);
				}
				return;
			}

			mutation.removedNodes.forEach((node: Node) => this.remove(node));
			mutation.addedNodes.forEach((node: Node) => this.add(node));
		});
	};

	private add(node: Node): void {
		if (!this.isCopyable(node) || this.clones.has(node)) {
			return;
		}

		const clone: Node = this.cloneInto(node as HTMLElement);
		this.target.head.appendChild(clone);
		this.clones.set(node, clone);
	}

	private remove(node: Node): void {
		const clone: Node | undefined = this.clones.get(node);
		clone?.parentNode?.removeChild(clone);
		this.clones.delete(node);
	}

	private isCopyable(node: Node): boolean {
		if (node instanceof HTMLLinkElement) {
			return node.rel === 'stylesheet';
		}

		if (node instanceof HTMLStyleElement) {
			return !node.hasAttribute('data-emotion');
		}

		return false;
	}

	private cloneInto(element: HTMLElement): Node {
		const clone: HTMLElement = this.target.importNode(element, true) as HTMLElement;

		if (element instanceof HTMLLinkElement) {
			clone.setAttribute('href', element.href);
		}

		return clone;
	}
}
