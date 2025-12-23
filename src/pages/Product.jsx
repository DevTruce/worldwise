import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWise.</h2>
          <p>
            WorldWise is your personal travel companion that helps you document
            and remember every adventure. Whether you&apos;re exploring bustling
            cities, serene mountains, or hidden gems around the globe, we make
            it easy to track where you&apos;ve been and relive those special
            moments.
          </p>
          <p>
            Our interactive map lets you mark every destination you&apos;ve
            visited, add personal notes about your experiences, and see your
            travel journey unfold. Never forget the places that shaped you, and
            share your wanderlust story with friends and family.
          </p>
        </div>
      </section>
    </main>
  );
}
