import Fact from './Fact'
import Message from './shared/Message'

function FactList({ facts, setFacts }) {
	if(facts.length === 0) {
		return (
			<Message message={'No facts for this category yet! Create the first one ✌'}/>
		)
	}

	return (
		<section className='section-facts'>
			<ul className='facts-list'>
				{facts.map(fact => <Fact key={fact.id} fact={fact} setFacts={setFacts}/>)}
			</ul>
			<Message message={`There are ${facts.length} facts in the database. Add your own!`} type='info' />
		</section>
	)
}
export default FactList
