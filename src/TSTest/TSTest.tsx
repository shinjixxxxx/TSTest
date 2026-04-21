// =============================================================
// ジェネリック（Generics）学習サンプル
// =============================================================
//
// 【ジェネリックとは？】
//   「型を引数として受け取る」仕組みです。
//   たとえば number の配列にも string の配列にも使える
//   汎用的なコンポーネントや関数を、型安全に作れます。
//
//   書き方: 関数名やtype名の後に <T> と書くだけ。
//   T はただの名前（慣習的に T, A, B などを使う）で、
//   呼び出す側が「T = number」「T = string」のように決めます。
// =============================================================


// -------------------------------------------------------------
// ① GenericList<T>
//    「任意の型 T の配列」を受け取ってリスト表示するコンポーネント
// -------------------------------------------------------------

// Props の型定義にもジェネリックを使える。
// <T> を付けることで、items・renderItem が同じ型 T で連動する。
//
//   items: T[]             → T 型の要素が並んだ配列
//   renderItem: (item: T) => string
//                          → T 型の要素を受け取って文字列を返す関数
//
// こうすることで「numbers を渡したら renderItem の引数も number」と
// TypeScript が自動で推論してくれる。
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => string;
  title: string;
};

// 関数コンポーネントにジェネリックを付ける書き方:
//   function GenericList<T>(...) { ... }
//
// 呼び出し側で items={[1, 2, 3]} と渡すと、
// TypeScript が「T = number」と推論してくれるので
// <GenericList<number> ...> と明示しなくてもよい。
function GenericList<T>({ items, renderItem, title }: ListProps<T>) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h2>{title}</h2>
      <ul>
        {items.map((item, i) => (
          // renderItem は T → string の関数なので、
          // どんな型でも統一した方法で表示できる
          <li key={i}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}


// -------------------------------------------------------------
// ② GenericPair<A, B>
//    「2つの異なる型」を同時に扱うコンポーネント
// -------------------------------------------------------------

// 型引数は複数持てる。ここでは A と B の2つ。
//   first: A  と  second: B  は別々の型でも構わない。
//
// 例: first が number で second が string でも OK。
//     それぞれに対応する render 関数も A → string, B → string と
//     型が揃っているので、間違った型を渡すとコンパイルエラーになる。
type PairProps<A, B> = {
  label: string;
  first: A;          // 1つ目の値（型 A）
  second: B;         // 2つ目の値（型 B）
  renderFirst: (v: A) => string;   // A を文字列にする関数
  renderSecond: (v: B) => string;  // B を文字列にする関数
};

// <A, B> と2つの型引数を並べて書く
function GenericPair<A, B>({ label, first, second, renderFirst, renderSecond }: PairProps<A, B>) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h2>{label}</h2>
      {/* renderFirst / renderSecond がそれぞれの型に対応している */}
      <p>First: <strong>{renderFirst(first)}</strong></p>
      <p>Second: <strong>{renderSecond(second)}</strong></p>
    </div>
  );
}


// -------------------------------------------------------------
// ③ GenericFilter<T>
//    「条件に合う要素だけ抽出」して表示するコンポーネント
// -------------------------------------------------------------

// predicate（述語関数）も T を受け取るので、
// 渡す items の型に合ったフィルター条件を書ける。
//
//   predicate: (item: T) => boolean
//     → T 型の要素を受け取り、表示するかどうかを boolean で返す関数
//
// 例: T = Product なら (p) => p.price <= 200 のように
//     Product のプロパティにアクセスできる（補完も効く）。
type FilterProps<T> = {
  items: T[];
  predicate: (item: T) => boolean;  // フィルター条件
  renderItem: (item: T) => string;
  title: string;
};

function GenericFilter<T>({ items, predicate, renderItem, title }: FilterProps<T>) {
  // Array.filter に predicate をそのまま渡せる。
  // T が何であっても同じコードで動く。
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


// -------------------------------------------------------------
// 呼び出し側: 3つのコンポーネントをサンプルデータで使う
// -------------------------------------------------------------

// 独自の型を定義。GenericFilter に渡すと T = Product と推論される。
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

      {/*
        ① GenericList に number[] を渡す
          → TypeScript が T = number と推論する
          → renderItem の引数 n も自動的に number になる
      */}
      <GenericList
        title="① GenericList — 数値リスト"
        items={numbers}
        renderItem={(n) => `${n}`}  // n は number と推論される
      />

      {/*
        ② GenericPair に number と number を渡す
          → A = number, B = number と推論される
          → first/second を間違った型にするとエラーになる
      */}
      <GenericPair
        label="② GenericPair — 最高値と最低値"
        first={Math.max(...numbers)}   // A = number
        second={Math.min(...numbers)}  // B = number
        renderFirst={(v) => `最大 ${v}`}
        renderSecond={(v) => `最小 ${v}`}
      />

      {/*
        ③ GenericFilter に Product[] を渡す
          → T = Product と推論される
          → predicate の p は Product 型になり、p.price にアクセスできる
          → 存在しないプロパティ（p.hoge など）はコンパイルエラー
      */}
      <GenericFilter
        title="③ GenericFilter — 200円以下の商品"
        items={products}
        predicate={(p) => p.price <= 200}              // p は Product 型
        renderItem={(p) => `${p.name}（${p.price}円）`}
      />

    </div>
  );
}

export default TSTest;
