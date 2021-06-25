export const List = ({list, users}) => {
    return <table>
        <thead>
           <tr>
               <th>名稱</th>
               <th>負責人</th>
           </tr>
        </thead>
        <tbody>
        {
            
            list.map(project => <tr key={project.id}>
                <td>{project.name}</td>
                <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                </tr>
            )
        }         
        </tbody>
    </table>
}