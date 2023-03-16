import { useContext } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import NavigationItem from './components/NavigationItem';
import UserBar from './components/UserBar';
import { DROPDOWN, LOGGED_USER_OPTIONS } from './constants';

import styles from './styles.module.scss';

import UserContext from '~context/UserContext/UserContext';
import useBreakpoint from '~hooks/useBreakpoint';

const ANIMATION_CONFIG = {
    from: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: -100, opacity: 0 },
    config: { ...config.stiff },
};

const BACKDROP_CONFIG = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { ...config.stiff },
};

interface Props {
    showNavbar: boolean;
    toggleNavbar: () => void;
}

function NavigationMenu({ showNavbar, toggleNavbar }: Props) {
    const transition = useTransition(showNavbar, ANIMATION_CONFIG);
    const backdropTransition = useTransition(showNavbar, BACKDROP_CONFIG);
    const { xs } = useBreakpoint();
    const { isLoggedIn } = useContext(UserContext);

    return (
        <>
            {transition(
                (style, item) =>
                    item && (
                        <animated.div
                            style={{
                                ...style,
                                position: 'fixed',
                                zIndex: 999,
                                top: 0,
                                left: 0,
                            }}
                            className={styles.menu}
                        >
                            <nav className={styles.container}>
                                <UserBar />
                                {DROPDOWN.map((nav) => (
                                    <NavigationItem {...nav} key={nav.id} />
                                ))}

                                {isLoggedIn &&
                                    LOGGED_USER_OPTIONS.map((nav) => (
                                        <NavigationItem {...nav} key={nav.id} />
                                    ))}
                                {xs && (
                                    <NavigationItem
                                        icon={faTimes}
                                        name="Cerrar menú"
                                        onClick={toggleNavbar}
                                    />
                                )}
                            </nav>
                        </animated.div>
                    )
            )}
            {backdropTransition(
                (style, item) =>
                    item && (
                        <animated.div style={style}>
                            <div
                                className={styles.backdrop}
                                onClick={toggleNavbar}
                                role="none"
                            />
                        </animated.div>
                    )
            )}
        </>
    );
}
export default NavigationMenu;
