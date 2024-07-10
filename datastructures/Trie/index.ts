class TrieNode {
    children: { [key: string]: TrieNode } = {};
    isEndOfWord: boolean = false;
    word: string | null = null;
}

export class Trie {
    root: TrieNode = new TrieNode();

    insert(word: string): void {
        let current = this.root;
        for (let char of word.toLowerCase()) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
        current.word = word;  // Store the original word with its original case
    }

    search(prefix: string): string[] {
        let current = this.root;
        for (let char of prefix.toLowerCase()) {
            if (!current.children[char]) return [];
            current = current.children[char];
        }
        const results = this.findAllWords(current, prefix.toLowerCase(), []);

        // Remove exact match if it exists
        return results.filter(word => word.toLowerCase() !== prefix.toLowerCase());
    }

    private findAllWords(node: TrieNode, prefix: string, result: string[]): string[] {
        if (node.isEndOfWord && node.word) {
            result.push(node.word);
        }
        for (let char in node.children) {
            this.findAllWords(node.children[char], prefix + char, result);
        }
        return result;
    }
}