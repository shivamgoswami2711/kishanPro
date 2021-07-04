<div className="leftheader">
                <span className="cencelLeftHeader" onClick={()=>setWindowName('')}>X</span>
                <div>
                    <div className="button newPrice" onClick={()=>setWindowName('newPricePost')}>new price</div>
                </div>
                <div>
                    <h3>Filter</h3>
                    {/* hh */}
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Seed</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={Seed}
                        onChange={event=>setSeed(event.target.value)}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Quality </InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={quality}
                        onChange={event=>setQuality(event.target.value)}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"Low"}>Low</MenuItem>
                        </Select>
                    </FormControl>
                        <Typography id="discrete-slider" gutterBottom>Moisture</Typography>
                        <Slider
                            defaultValue={1}
                            getAriaValueText={value=>`${value}%`}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={20}
                        />
                        <Typography id="discrete-slider" gutterBottom>Fungus</Typography>
                        <Slider
                            defaultValue={1}
                            getAriaValueText={value=>`${value}%`}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={20}
                        />
                </div>
            </div>