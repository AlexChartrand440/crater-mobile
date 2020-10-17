import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import { CUSTOMER_FORM, CUSTOMER_ADD } from '../../constants';
import * as customerAction from '../../actions';
import { Customer } from '../../components/Customer';
import { getStateCurrencies } from '../../selectors';
import * as settingsAction from '@/features/settings/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale, currencies, currency },
        customers: {
            countries,
            loading: {
                customerLoading,
                getEditCustomerLoading,
                countriesLoading
            }
        },
        settings: { customFields }
    } = state;

    let customerId = navigation.getParam('customerId', null);
    let type = navigation.getParam('type', CUSTOMER_ADD);

    return {
        formValues: getFormValues(CUSTOMER_FORM)(state) || {},
        type,
        locale,
        currencies: getStateCurrencies(currencies),
        countries,
        currency,
        customFields,
        customerLoading,
        getEditCustomerLoading,
        countriesLoading,

        initialValues: {
            enable_portal: false,
            currency_id: null,
            id: customerId,
            customFields: null
        }
    };
};

const mapDispatchToProps = {
    createCustomer: customerAction.createCustomer,
    editCustomer: customerAction.editCustomer,
    getEditCustomer: customerAction.getEditCustomer,
    removeCustomer: customerAction.removeCustomer,
    getCountries: customerAction.getCountries,
    getCustomFields: settingsAction.getCustomFields,
    resetCustomFields: settingsAction.resetCustomFields
};

//  Redux Forms
const addEditCustomerReduxForm = reduxForm({
    form: CUSTOMER_FORM,
    validate
})(Customer);

//  connect
const AddEditCustomerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addEditCustomerReduxForm);

AddEditCustomerContainer.navigationOptions = () => ({
    header: null
});

export default AddEditCustomerContainer;
