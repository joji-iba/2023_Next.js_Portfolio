import {
  useInView,
  useMotionValue,
  useSpring,
  // MotionValue,
  // TargetAndTransition,
} from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { FC, useEffect, useRef } from 'react';
import ProfilePic from '../../public/images/patternB.png';
import ProfilePicDark from '../../public/images/patternB01.png';
import { AnimatedText } from 'components/AnimatedText';
import { Layout } from 'components/Layout';
import Skills from 'components/Skills';
import { TransitionEffect } from 'components/TransitionEffect';

// 型定義
type AnimatedNumbersProps = {
  value: number;
};

// valueで渡した数値までのカウントアップ実装
const AnimatedNumbers: FC<AnimatedNumbersProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null); // HTML（spanタグ）へのアクセス

  const motionValue = useMotionValue(0); // 数値の値の変化を監視（初期値0）→valueまで変化
  const springValue = useSpring(motionValue, { duration: 3000 }); // アニメーションの制御
  const isInview = useInView(ref, {
    // refが画面内に表示されたかを検出
    once: true,
  }) as boolean;

  useEffect(() => {
    // タイマー処理 = 副作用
    if (isInview && motionValue.get() !== value) {
      // valueに渡した値まで変化する
      motionValue.set(value);
    }
  }, [isInview, value, motionValue]); // 依存配列のstate更新の度

  useEffect(() => {
    springValue.on('change', (latest) => {
      // springValue変更時に実行される関数の登録（onメソッド）
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0); // 小数点以下は切り捨て表示
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};

const about = () => {
  // ダークモードでの画像切替
  const theme = localStorage.getItem('theme') || 'light';
  const imgSrc = theme === 'dark' ? ProfilePicDark : ProfilePic;

  return (
    <>
      <Head>
        <title>Joji Iba | About Page</title>
        <meta name="description" content="私について" />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="I'll continue to challenge technological innovation."
            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />
          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="col-span-3 flex flex-col items-center justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                私について
              </h2>
              <p className="font-medium">
                -【経歴:教員→住宅設計→Webエンジニア】
                <br />
                2020年にプログラミングと出会い、独学でフロントエンド分野を学び、Webマーケティング会社や受託開発系企業のWebエンジニアとして、3年間コーディングとマーケティング業務に携わっています。
              </p>
              <p className="my-4 font-medium">
                -
                前職のマーケティング会社では、Web上での「表示速度」に拘り抜いてコーディングしていました。
                CVRにも直結する要素である為、ユーザーにとって、スムーズな「画面遷移」や「レンダリング」は非常に重要な要素だと考えています。
                ReactやNext.jsを学び始めたことがきっかけで、『UI/UXを意識したエンジニアとしてスキルを磨き、利便性とパフォーマンスの高いSPA開発/Webサイト制作をしたい』と考えるようになりました。
              </p>
              <p className="my-4 font-medium">
                -
                現職の受託系開発企業ではReact/Next.js、TypeScriptやAstroなどの技術を用いた開発/制作に従事しております。また、Lighthouse分析でのCore&nbsp;Web&nbsp;Vitalsの数値改善（フロントエンドチューニング）も得意としています。
              </p>
              <p className="my-4 font-medium">
                -
                多くの技術に触れた上で、いつからか「仕様通りのものをただ作るのではなく、ユーザーファーストの思考で開発を進め、リリース後も実際に使ったユーザーの反応を見ながら改善点などを検証し、より価値のあるものを提供できるようになりたい」と考えるようになりました。自分のフロントエンドスキルを、ものづくりを超えて社会課題の解決へと昇華したいと考えています。
              </p>
              <p className="font-medium">
                -
                エンジニアとしての「自走力」と「知的好奇心旺盛さ」をフルに発揮し、ユーザー中心的な考え方をもって実務に取り組みます！
                私のスキルと情熱を発揮する機会を楽しみにしています！！
              </p>
            </div>

            <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8">
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={imgSrc}
                alt="Joji Iba"
                className="w-full h-auto rounded-2xl"
                priority
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </div>

            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={30} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  age
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={3} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  years of experience
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={100} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  willingness
                </h2>
              </div>
            </div>
          </div>
          <Skills />
        </Layout>
      </main>
    </>
  );
};

export default about;
