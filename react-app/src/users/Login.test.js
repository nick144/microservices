import Login from './Login';
import { shallow } from 'enzyme';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/This is playground!/i);
//   expect(linkElement).toBeInTheDocument();
// });


describe('Test case for testing login', () => {
    let wrapper; 
    const user = {
        username: 'dom',
        password: 'coldcold'
    }
    

    it("Check if username is correct", () => {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="text"]').simulate("change", {
            target: { id: "username", value: user.username }
        });
        expect(wrapper.state("username")).toEqual(user.username);
    });

    it("Check if password is correct", () => {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="password"]').simulate("change", {
            target: { id: "password", value: user.password }
        });
        expect(wrapper.state("password")).toEqual(user.password);
    });

    it("Login check with right data", () => {
        wrapper = shallow(<Login />);
        wrapper.find('input[type="text"]').simulate("change", {
            target: {id: 'username', value: 'dom'}
        });

        wrapper.find('input[type="password"]').simulate("change", {
            target: {id: 'username', value: 'coldcold'}
        });

        wrapper.find('button').simulate('click');
        expect(wrapper.state('loggedin')).toBe(true);
    });

    it("Login check with wrong data", () => {
        wrapper = shallow(<Login />);
        wrapper.find('input[type="text"]').simulate("change", {
            target: {id: 'username', value: 'dom1'}
        });

        wrapper.find('input[type="password"]').simulate("change", {
            target: {id: 'username', value: 'coldcold1'}
        });

        wrapper.find('button').simulate('click');
        expect(wrapper.state('loggedin')).toBe(false);
    });
});