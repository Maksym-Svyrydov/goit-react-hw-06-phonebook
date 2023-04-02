// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts } from 'redux/contatctsSlice';
import { getContacts, getFilter } from '../../redux/selectors';

import { useMemo } from 'react';

import { List, Item, Text, DeleteBtn } from './ContactList.styled';

const ContactList = () => {
  const contacts = useSelector(getContacts);

  const filterValue = useSelector(getFilter);
  const dispatch = useDispatch();
  console.log(contacts);
  // console.log(filterValue);
  const filterContactsList = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase().trim())
    );
  }, [contacts, filterValue]);

  return (
    <List>
      {filterContactsList.map(({ id, name, number }) => (
        <Item key={id}>
          <Text>{`${name}: ${number}`}</Text>
          <DeleteBtn
            type="button"
            onClick={() => {
              dispatch(deleteContacts(id));
            }}
          >
            Delete
          </DeleteBtn>
        </Item>
      ))}
    </List>
  );
};
// ContactList.propTypes = {
//   contactList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       name: PropTypes.string,
//       number: PropTypes.string,
//     })
//   ).isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

export default ContactList;
