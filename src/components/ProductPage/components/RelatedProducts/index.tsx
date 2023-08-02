import { useEffect, useState } from 'react';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

import CustomCard from '~components/CustomCard';
import { PRODUCTS } from '~components/OnSaleSection/constants';

interface Props {
    hide?: boolean;
}

function RelatedProducts({ hide }: Props) {
    const [current, setCurrent] = useState(0);

    const slideLength = PRODUCTS.length;

    const slideshowSlides = [];
    const nextSlide = () => {
        setCurrent((prevState) =>
            prevState === slideshowSlides.length - 1 ? 0 : current + 1
        );
    };

    const prevSlide = () => {
        setCurrent((prevState) =>
            prevState === 0 ? slideshowSlides.length - 1 : current - 1
        );
    };

    if (!Array.isArray(PRODUCTS) || PRODUCTS.length <= 0) {
        return null;
    }

    for (let i = 0; i < slideLength; i += 2) {
        slideshowSlides.push(
            <div className={styles.card}>
                <CustomCard
                    small
                    image={PRODUCTS[i].image}
                    name={PRODUCTS[i].description}
                    price={PRODUCTS[i].price}
                    stars={PRODUCTS[i].stars}
                    votes={PRODUCTS[i].votes}
                    key={PRODUCTS[i].id}
                />
                {PRODUCTS[i + 1] && (
                    <CustomCard
                        small
                        image={PRODUCTS[i + 1].image}
                        name={PRODUCTS[i + 1].description}
                        price={PRODUCTS[i + 1].price}
                        stars={PRODUCTS[i + 1].stars}
                        votes={PRODUCTS[i + 1].votes}
                        key={PRODUCTS[i + 1].id}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Tambien te puede interesar </div>
            <div className={styles.slider}>
                {hide && slideLength >= 2 && (
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className={styles.arrowLeft}
                        onClick={prevSlide}
                    />
                )}
                {slideshowSlides.map((i, index) => (
                    <div
                        key={index}
                        className={
                            index === current
                                ? styles.slideActive
                                : styles.slide
                        }
                    >
                        {i}
                    </div>
                ))}

                {hide && slideLength >= 2 && (
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={styles.arrowRight}
                        onClick={nextSlide}
                    />
                )}
            </div>
        </div>
    );
}

export default RelatedProducts;
