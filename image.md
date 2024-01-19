https://images.unsplash.com/photo-1590621819878-3fa04495626c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60

https://images.unsplash.com/photo-1633679317861-03829e0a968e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60

https://images.unsplash.com/photo-1574182245530-967d9b3831af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60

https://images.unsplash.com/photo-1579783901467-31b604eac7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60

    <section className="flex justify-between items-center border border-black p-2">
          {/* 要抽換 */}
          <DropDownList
            defaultItem={'作家/作品'}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            items={['作品', '作家']}
          />
          {/* Filter */}
          <div className="relative border border-black ">
            <button
              onClick={() => setIsShow((pre) => !pre)}
              className="block p-1"
            >
              <AdjustmentsHorizontalIcon width={24} height={24} />
            </button>
            <ul
              className={`absolute top-[120%] left-0 w-fit bg-white flex flex-col h-0 transition-all duration-500 ${
                isShow
                  ? 'h-fit border border-black overflow-visible'
                  : 'overflow-hidden '
              }`}
            >
              <li className="flex justify-between pt-2 px-2 ">
                <p className="font-bold text-lg">篩選器</p>
                <button
                  className="text-sm"
                  onClick={() => {
                    setStartDate();
                    setEndDate();
                    setTagInput();
                    setIsSold();
                    setIsBid();
                    setTags([]);
                  }}
                >
                  X 清除設定
                </button>
              </li>
              <li className="p-2 flex flex-col">
                <span>商品發佈日期：(起始～結束)</span>
                <DateInput
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              </li>
              <li className="p-2 flex flex-col gap-1">
                <p>商品售出狀態:</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <div className="mr-2">
                    <input
                      onClick={() => setIsSold(false)}
                      id="isSold-false"
                      type="checkbox"
                      checked={isSold === false}
                    />
                    <label htmlFor="isSold-false">未售出</label>
                  </div>
                  <div>
                    <input
                      onClick={() => setIsSold(true)}
                      id="isSold-true"
                      type="checkbox"
                      checked={isSold === true}
                    />
                    <label htmlFor="isSold-true">已售出</label>
                  </div>
                </div>
              </li>
              <li className="p-2 flex flex-col gap-1">
                <p>商品是否開啟競標:</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <div className="mr-2">
                    <input
                      onClick={() => {
                        setIsBid(false);
                      }}
                      id="isBid-false"
                      type="checkbox"
                      checked={isBid === false}
                    />
                    <label htmlFor="isBid-false">非競標</label>
                  </div>
                  <div>
                    <input
                      onClick={() => setIsBid(true)}
                      id="isBid-true"
                      type="checkbox"
                      checked={isBid === true}
                    />
                    <label htmlFor="isBid-true">競標</label>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col p-2">
                  <label htmlFor="tag">創作標籤</label>

                  <div className="flex flex-col gap-4 mb-2">
                    <input
                      onChange={(e) => {
                        setTagInput(e.target.value);
                      }}
                      className="border-b border-black p-1 outline-none flex-1"
                      type="text"
                      name="tags"
                      value={tagInput}
                      placeholder="請輸入創作標籤"
                    />
                    <button
                      onClick={() => {
                        if (tagInput === '') return;
                        setTagInput('');
                        setTags((pre) => [...pre, tagInput]);
                      }}
                      className="p-1 bg-black text-white"
                      type="button"
                    >
                      新增
                    </button>
                    <ul className="flex flex-wrap gap-1">
                      {tags.map((item, index) => (
                        <li
                          key={`item-${item}-${index}`}
                          className="px-2 py-1 border border-black rounded-full flex justify-center gap-1"
                        >
                          <button
                            onClick={() => {
                              setTags((pre) => {
                                const newTags = [...pre];
                                newTags.splice(index, 1);
                                return newTags;
                              });
                            }}
                            type="button"
                          >
                            <XMarkIcon width={12} height={12} />
                          </button>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-3/4">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              className="border-b border-black p-1 outline-none w-full"
              type="search"
              name="search"
              id="search"
              placeholder="請輸入搜尋項目"
            />
          </div>
          <button
            onClick={handelSearch}
            className="bg-black text-white py-2 px-4"
          >
            搜索
          </button>
          {/* 分類 */}
        </section>
        <div className="my-4">
          <SearchTags tags={tags} setTags={setTags} />
        </div>
        <section className="pb-4">
          {debounceName && (
            <p className="text-xl font-bold py-4">搜索結果({resultLen})：</p>
          )}
        </section>
