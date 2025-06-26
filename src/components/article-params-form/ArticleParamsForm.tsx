import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState, useRef } from 'react';
import {
	OptionType,
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	appliedSettings: ArticleStateType;
	setAppliedSettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	appliedSettings,
	setAppliedSettings,
}: Props) => {
	// Реф для формы, чтобы работал клик мимо окна
	const sidebarRef = useRef<HTMLElement>(null);

	// Стейт открытого-закрытого сайдбара
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	// Стейт объекта с выбранными стилями для отображения в форме
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(appliedSettings);

	// Обработчик изменения полей ввода
	const handleChange = (field: keyof ArticleStateType, option: OptionType) => {
		setArticleSettings((prev) => ({
			...prev,
			[field]: option,
		}));
	};

	// Отмена сабмита формы через Enter
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	// Применение стилей к странице
	const handleApply = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setAppliedSettings(articleSettings);
	};

	// Сброс значений формы к дефолтным
	const handleReset = () => {
		setArticleSettings(defaultArticleState);
	};

	// Переключение состояния формы
	const toggleForm = () => {
		setIsMenuOpen(isMenuOpen ? false : true);
	};

	// Хук для реакции на клик мимо окна
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: sidebarRef,
		onClose: () => { },
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleForm} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} 
					${isMenuOpen ? styles.container_open : ''}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text
						as='h2'
						size={31}
						weight={800}
						uppercase
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleSettings.fontFamilyOption}
						onChange={(option) => {
							return handleChange('fontFamilyOption', option);
						}}
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={articleSettings.fontSizeOption}
						onChange={(option) => {
							return handleChange('fontSizeOption', option);
						}}
						title='Размер шрифта'
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleSettings.fontColor}
						onChange={(option) => {
							return handleChange('fontColor', option);
						}}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleSettings.backgroundColor}
						onChange={(option) => {
							return handleChange('backgroundColor', option);
						}}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleSettings.contentWidth}
						onChange={(option) => {
							return handleChange('contentWidth', option);
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>

						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
