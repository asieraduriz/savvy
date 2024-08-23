import { useMemo } from 'react';
import { Trie } from '../datastructures/Trie';

export function useSearchTrie(titles: string[]) {
    const trie = useMemo(() => {
        const t = new Trie();
        titles.forEach(title => t.insert(title));
        return t;
    }, [titles]);

    return {
        search: (prefix: string) => trie.search(prefix)
    };
}