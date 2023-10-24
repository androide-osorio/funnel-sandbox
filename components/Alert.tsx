type Props = {
	title: string;
	text: string;
};

export function Alert({ title, text }: Props) {
	return (
		<section className="bg-red-400 dark:bg-red-200 border border-red-700 text-white dark:text-slate-800 px-4 py-3 rounded relative" role="alert">
			<strong className="font-bold">{title}</strong>&nbsp;
			<span className="block sm:inline">{text}</span>
		</section>
	);
}