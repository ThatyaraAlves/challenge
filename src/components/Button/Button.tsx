import styles from './Button.module.css';

interface ButtonProps {
    title: string;
    variant: 'white' | 'green';
    image?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, image, title, onClick }) => {
    const buttonClass = (variant === 'white' ? styles.white : styles.green) + ' ' + styles.button;
    return (
        <button className={buttonClass} onClick={onClick}>
            <img src={image} title={title} alt="Button Icon" />
            <p>{title}</p>
        </button>
    )
}

export default Button;


