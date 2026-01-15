import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { useClose } from 'src/hooks/useClose';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	appliedState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { appliedState, onApply, onReset } = props;

	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(appliedState);

	useEffect(() => {
		setFormState(appliedState);
	}, [appliedState]);

	const asideRef = useRef<HTMLElement | null>(null);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const closeMenu = () => setIsOpen(false);

	useClose({
		isOpenElement: isOpen,
		onClose: closeMenu,
		elementRef: asideRef,
	});

	const updateFormState = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
		closeMenu();
	};

	const handleReset = () => {
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => updateFormState('fontFamilyOption', option)}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => updateFormState('fontSizeOption', option)}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) => updateFormState('fontColor', option)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateFormState('backgroundColor', option)}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateFormState('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
