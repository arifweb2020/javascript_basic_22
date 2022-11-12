{
                  payload[0]?.payload?.InsulinBrand?.map((ins, index) => {
                    return <>{ins}{index === payload[0]?.payload?.InsulinBrand.length - 1 ? "" :
                      index === payload[0]?.payload?.InsulinBrand.length - 2 ? <> and </> :
                        <>, </>
                        }
