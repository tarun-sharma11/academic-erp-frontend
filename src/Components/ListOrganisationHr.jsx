import React from 'react'

export const ListOrganisationHr = () => {
    const organisationhr = []
  return (
    <div>
        <h2 className='text-center'>Organisation's Hr List</h2>
        <div className="row">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name of the Organisation's Hr</th>
                        <th>Address of the Organisation's Hr</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        organisationhr.map((org)=>(
                            <tr key={org.id}>
                                <td>{org.name}</td>
                                <td>{org.address}</td>
                            </tr>       
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
