// ① リスト表示：任意の型の配列を受け取って表示する
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => string;
  title: string;
};

function GenericList<T>({ items, renderItem, title }: ListProps<T>) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h2>{title}</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}

// ② ペア表示：2つの異なる型の値をセットで表示する
type PairProps<A, B> = {
  label: string;
  first: A;
  second: B;
  renderFirst: (v: A) => string;
  renderSecond: (v: B) => string;
};

function GenericPair<A, B>({ label, first, second, renderFirst, renderSecond }: PairProps<A, B>) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h2>{label}</h2>
      <p>First: <strong>{renderFirst(first)}</strong></p>
      <p>Second: <strong>{renderSecond(second)}</strong></p>
    </div>
  );
}

// ③ フィルター表示：条件に合う要素だけ抽出して表示する
type FilterProps<T> = {
  items: T[];
  predicate: (item: T) => boolean;
  renderItem: (item: T) => string;
  title: string;
};

function GenericFilter<T>({ items, predicate, renderItem, title }: FilterProps<T>) {
  const filtered = items.filter(predicate);
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h2>{title}</h2>
      <p>全{items.length}件 → 絞り込み後: {filtered.length}件</p>
      <ul>
        {filtered.map((item, i) => (
          <li key={i}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}

// --- サンプルデータを使って3つを呼び出すコンポーネント ---
type Product = { name: string; price: number };

export function TSTest() {
  const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
  const products: Product[] = [
    { name: 'Apple', price: 120 },
    { name: 'Banana', price: 80 },
    { name: 'Cherry', price: 300 },
    { name: 'Durian', price: 1500 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
      {/* ① GenericList：数値の配列を表示 */}
      <GenericList
        title="① GenericList — 数値リスト"
        items={numbers}
        renderItem={(n) => `${n}`}
      />

      {/* ② GenericPair：文字列と数値のペア */}
      <GenericPair
        label="② GenericPair — 最高値と最低値"
        first={Math.max(...numbers)}
        second={Math.min(...numbers)}
        renderFirst={(v) => `最大 ${v}`}
        renderSecond={(v) => `最小 ${v}`}
      />

      {/* ③ GenericFilter：価格200円以下の商品だけ表示 */}
      <GenericFilter
        title="③ GenericFilter — 200円以下の商品"
        items={products}
        predicate={(p) => p.price <= 200}
        renderItem={(p) => `${p.name}（${p.price}円）`}
      />
    </div>
  );
}

export default TSTest;
