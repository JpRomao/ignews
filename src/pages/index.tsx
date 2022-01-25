import { GetStaticProps } from "next";
import Head from "next/head";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    price: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>

          <h1>
            News about the <span>React</span> world.
          </h1>

          <p>
            Get acess to all the publications <br />
            <span>for {product.price} month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const subscriptionStripePrice = await stripe.prices.retrieve(
    "price_1KCDwpLGs9OyZinIiZM3XZsL"
  );

  const product = {
    priceId: subscriptionStripePrice.id,
    price: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(subscriptionStripePrice.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
