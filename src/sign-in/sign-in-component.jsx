import React from 'react'
import FormInput from './form-input/form-input.component'
import CustomButton from '../custom-button/custom-button-component'
import './sign-in.styles.scss'


class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name : {
                first: '',
                last: ''
            },
            email : '',
            organization : '',
            title : '',
            phone : '',
            address : {
                streetadd :'',
                streetadd2 : '',
                city:'',
                state:'',
                zipcode:'',
                country:''
            }


        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit = event =>{
        event.preventDefault();

        this.setState({...this.state,
            name : {
                first: '',
                last: ''
            },
            email : '',
            organization : '',
            title : '',
            phone : '',
            address : {
                streetadd :'',
                streetadd2 : '',
                city:'',
                state:'',
                zipcode:'',
                country:''
        
        })  
     
    }

   

    handleChange=event=>{
        const { value , name }=event.target;
        this.setState({[name] :value})
        
    }   
    render(){
        return(
            <div className='userdata'>
                <h2>Company information</h2>
            
                <form onSubmit={this.handleSubmit}>
                <div className='FullName'>
                <label>Full Name</label>
                <span><input type='text' className='' placeholder= 'First Name' name='firstname' required onChange={this.handleChane}></input>
                </span>
                <span><input type='text' className='' placeholder= 'Last name' name='firstname'  onChange={this.handleChane}></input>
                </span>
                </div>
                    <FormInput name='organization' label='Organization' type='text' value={this.state.organization} handleChange={this.handleChange} required></FormInput>
                    <FormInput name='title' label='Title' type='text' value={this.state.title} handleChange={this.handleChange} required></FormInput>
                    <FormInput name='email' label='Email' type='email' value={this.state.email} handleChange={this.handleChange} required></FormInput>
                    <FormInput name='phone' label='Phone' type='text' value={this.state.phone} handleChange={this.handleChange} required></FormInput>
                    <FormInput name='address' label='street' type='text' value={this.state.address.streetadd} handleChange={this.handleChange} required></FormInput>
                    <FormInput name='address' label='street 2' type='text' value={this.state.address.streetadd2} handleChange={this.handleChange} required></FormInput> 
                    <FormInput name='address' label='city' type='text' value={this.state.address.city} handleChange={this.handleChange} required></FormInput>
                    <FormInput name='address' label='Zip' type='text' value={this.state.address.zipcode} handleChange={this.handleChange} required></FormInput>
                    
                    <div className='buttons'> 
                   <CustomButton type='submit' >Submit</CustomButton>               
                   </div> 
                </form>       
                    
            </div>
        )
    }
}

export default SignIn;