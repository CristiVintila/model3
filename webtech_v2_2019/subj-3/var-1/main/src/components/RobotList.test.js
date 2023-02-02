import React from 'react'
import ReactDOM from 'react-dom'
import RobotList from './RobotList'
import Robot from './Robot'
import RobotForm from './RobotForm'
import { shallow, mount, render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

it ('renders a robot form', () => {
	const component = mount(<RobotList />)
	expect(component.find(RobotForm).length).toEqual(1)	
})

it ('valid props on robot form', () => {
	const component = mount(<RobotList />)
	let form = component.find(RobotForm).first()
	expect(typeof form.props().onAdd).toEqual('function')
})

it ('add a robot and it exists on the page', () => {
	const component = mount(<RobotList />)
	let form = component.find(RobotForm).first()
	let nameInput = component.find('#name').first()
	nameInput.value = 'test_name'
	let typeInput = component.find('#type').first()
	typeInput.value = 'test_type'
	let massInput = component.find('#mass').first()
	massInput.value = 'test_mass'	
	let button = form.find('[value="add"]').first()
	button.simulate('click')
	expect(component.find(Robot).length).toEqual(3)	
})

it ('correct robot', () => {
	const component = mount(<RobotList />)
	let form = component.find(RobotForm).first()
	let nameInput = component.find('#name').first()
	nameInput.simulate('focus')
	nameInput.simulate('change', { target: { name : 'name', value: 'test_name' } })
	let typeInput = component.find('#type').first()
	typeInput.simulate('focus')
	typeInput.simulate('change', { target: {name : 'type', value: 'test_type' } })
	let massInput = component.find('#mass').first()
	massInput.simulate('focus')
	massInput.simulate('change', { target: { name : 'mass', value: 'test_mass' } })
	let button = form.find('[value="add"]').first()
	button.simulate('click')
	let robot = component.find(Robot).last()
	expect(robot.props().item).toEqual({id: 3, name : 'test_name', type : 'test_type', mass: 'test_mass'})	
})

