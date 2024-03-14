import { CATEGORIES } from '../data'
import Button from './shared/Button'

function CategoryFilter({ setCurrentCategory }) {
	return (
		<aside className='aside'>
			<ul className='category-list'>
				<li>
					<Button className={'btn btn-all-category'} handleClick={() => setCurrentCategory('all')}>All</Button>
				</li>
				{CATEGORIES.map(category => (
					<li key={category.name}>
						<Button 
						className={'btn btn-category'}
						style={{backgroundColor: category.color}} handleClick={() => setCurrentCategory(category.name)}
						>{category.name}</Button>
					</li>
				))}
			</ul>
		</aside>
	)
}
export default CategoryFilter
